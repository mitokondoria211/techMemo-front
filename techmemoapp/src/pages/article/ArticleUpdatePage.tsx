import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { EditorView } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import { articleEditSchema } from "../../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  useForm,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";

import ArticleConfirmDialog from "../../components/article/ArticleConfirmDialog";
import type z from "zod";
import { useArticleDetail } from "../../features/article/useArticleDetail";
import type { ArticleRequest } from "../../types/article";
import { useNavigate, useParams } from "react-router-dom";
import { useCategory } from "../../features/category/useCategory";
import AddIcon from "@mui/icons-material/Add";
import ArticleAddUrlDialog from "../../components/article/ArticleAddUrlDialog";
import { useUnsavedChangesWarning } from "../../hooks/useUnsavedChangesWarning";
import { useBeforeUnload } from "../../hooks/useBeforeUnload";

const AriticleUpdatePage = () => {
  // const [tagListText, setTagListText] = useState("");
  const { id } = useParams();
  const { article } = useArticleDetail(Number(id));

  const { categories } = useCategory();
  const [mode, setMode] = useState<"split" | "write" | "preview">("split");
  const [openUrlModal, setOpenUrlModal] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const { handleSubmit, control, reset, setValue, formState } = useForm<
    z.input<typeof articleEditSchema>, // input: tags は string
    undefined,
    z.output<typeof articleEditSchema> // output: tags は string[]
  >({
    resolver: zodResolver(articleEditSchema),
    defaultValues: {
      title: "",
      content: "",
      categoryId: "",
      tags: "",
      url: [],
    },
  });

  useBeforeUnload(formState.isDirty);
  useUnsavedChangesWarning(formState.isDirty);

  useEffect(() => {
    console.log(article);
    if (article) {
      reset({
        title: article.title,
        content: article.content,
        categoryId: article.category.id,
        tags: article.tags.map((tag) => tag.name).join(", "),
        url: article.urls,
      });
      console.log(article.tags.map((tag) => tag.name).join(", "));
    }
  }, [article, reset]);
  console.log(article);

  const urls = useWatch({ control, name: "url" }) ?? [];

  const { updataArticle } = useArticleDetail();

  const initTitleMessage = "タイトルは4文字以上50字以内で入力してください";
  const initArticleMessage = "# 記事を書いてみましょう";
  const initTagListMessage =
    "タグはカンマ(,)区切りで、入力してください。(タグは5個まで可能です.また、タグはなしでも可です)";
  const content = useWatch({ control, name: "content" }) ?? "";

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<z.output<typeof articleEditSchema>> = (
    form,
  ) => {
    const request: ArticleRequest = {
      title: form.title,
      content: form.content,
      categoryId: form.categoryId,
      tagNames: form.tags,
      urls: form.url,
    };
    console.log(request);
    try {
      updataArticle(Number(id), request);
      setSuccessOpen(true);
    } catch (e) {
      console.error(e);
      setErrorOpen(true);
    }
  };

  const handleMode = (_: unknown, value: "split" | "write" | "preview") => {
    if (value) setMode(value);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        // maxHeight: "100vh",
        overflow: "hidden",
        height: "100%",
        px: 2,
        py: 2,
        minHeight: 0,
      }}
      maxWidth={false}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 1,
          flexShrink: 0,
        }}
        onSubmit={handleSubmit(() => setOpenPreview(true))}
      >
        {/* タイトル */}
        <Typography variant="h5" fontWeight={700} sx={{ flexShrink: 0 }}>
          記事投稿
        </Typography>
        <Box>
          <Button
            variant="contained"
            onClick={handleSubmit(() => setOpenPreview(true))}
          >
            記事を投稿
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={successOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={() => {
          setSuccessOpen(false);
          navigate("/article");
        }}
      >
        <Alert severity="success" variant="filled">
          作成が完了しました
        </Alert>
      </Snackbar>

      {/* 失敗 */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorOpen}
        autoHideDuration={3000}
        onClose={() => setErrorOpen(false)}
      >
        <Alert severity="error" variant="filled">
          作成に失敗しました
        </Alert>
      </Snackbar>
      <Box display="flex" justifyContent="space-between" gap={3} sx={{ mb: 2 }}>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="タイトル"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              placeholder={initTitleMessage}
              size="small"
              sx={{ flexShrink: 0, flex: 7 }}
            />
          )}
        />

        <Controller
          name="categoryId"
          control={control}
          render={({ field, fieldState }) => (
            <FormControl
              sx={{ flex: 3, minWidth: 160 }}
              size="small"
              error={!!fieldState.error}
            >
              <InputLabel size="small">カテゴリー</InputLabel>

              <Select {...field} label="カテゴリー" value={field.value ?? ""}>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 2,
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <Controller
          name="tags"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="タグ"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              placeholder={initTagListMessage}
              size="small"
              sx={{ flex: 1, flexShrink: 0 }}
            />
          )}
        />
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleMode}
          size="small"
        >
          <ToggleButton value="split">
            <CalendarViewMonthIcon />
          </ToggleButton>
          <ToggleButton value="write">
            <EditIcon />
          </ToggleButton>
          <ToggleButton value="preview">
            <VisibilityIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <Button
          startIcon={<AddIcon />}
          size="small"
          onClick={() => setOpenUrlModal(true)}
        >
          参考URL追加
        </Button>
      </Box>

      {/* モード切替 */}

      {/* Editor / Preview */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          gap: 2,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        {(mode === "write" || mode === "split") && (
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              overflow: "hidden", // ← autoからhiddenに
              display: "flex", // ← 追加
              flexDirection: "column", // ← 追加
            }}
            border={1}
          >
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <CodeMirror
                  placeholder={initArticleMessage}
                  value={field.value ?? ""}
                  onChange={(value) => field.onChange(value)}
                  height="100%"
                  extensions={[markdown(), EditorView.lineWrapping]}
                  basicSetup={{
                    lineNumbers: true,
                    highlightActiveLine: true,
                  }}
                  style={{
                    flex: 1,
                    // height: "100%",
                    overflow: "hidden",
                    // ← autoからhiddenに
                    display: "flex",
                    flexDirection: "column",
                  }} // ← height="100%"をpropsではなくstyleで
                />
              )}
            />
          </Box>
        )}

        {(mode === "preview" || mode === "split") && (
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              overflow: "auto",
              px: 2,
            }}
            className="markdown"
            border={1}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {content.length === 0 ? initArticleMessage : content}
            </ReactMarkdown>
          </Box>
        )}
      </Box>

      <ArticleConfirmDialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
      />
      <ArticleAddUrlDialog
        open={openUrlModal}
        onClose={() => setOpenUrlModal(false)}
        value={urls}
        onSave={(newUrls) => {
          setValue("url", newUrls, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }}
      />

      {/* 投稿ボタン */}
    </Container>
  );
};

export default AriticleUpdatePage;
