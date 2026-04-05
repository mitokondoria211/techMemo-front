import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useCategory } from "../../features/category/useCategory";
import type { articleEditSchema } from "../../schema/schema";
import type { Control } from "react-hook-form";
import { Controller, useFieldArray } from "react-hook-form";
import type z from "zod";

type ArticlePreviewDialogProps = {
  open: boolean;
  control: Control<
    z.input<typeof articleEditSchema>,
    undefined,
    z.output<typeof articleEditSchema>
  >;
  onClose: () => void;
  onSubmit: () => void;
};

const ArticlePreviewDialog = ({
  open,
  onClose,
  control,
  onSubmit,
}: ArticlePreviewDialogProps) => {
  const { categories } = useCategory();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "url",
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>記事を投稿</DialogTitle>

      <DialogContent>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>カテゴリー</InputLabel>

              <Select {...field} label="カテゴリー" value={field.value ?? ""}>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Box>
          {fields.map((field, index) => (
            <Box key={field.id}>
              <Controller
                name={`url.${index}.title`}
                control={control}
                render={({ field }) => (
                  <TextField
                    label="参考URLタイトル"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                )}
              />

              <Controller
                name={`url.${index}.url`}
                control={control}
                render={({ field }) => (
                  <TextField label="URL" fullWidth margin="normal" {...field} />
                )}
              />
              <Button onClick={() => remove(index)}>削除</Button>
            </Box>
          ))}
          <Button
            onClick={() =>
              append({
                title: "",
                url: "",
              })
            }
          >
            参考URL追加
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button type="button" color="error" onClick={onSubmit}>
          投稿する
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ArticlePreviewDialog;
