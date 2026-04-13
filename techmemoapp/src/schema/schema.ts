import z from "zod";
import {
  validationMaxMessage,
  validationSizeMessage,
  validationRequiredMessaege,
} from "../util/message";

export const loginSchema = z.object({
  email: z
    .email("メール形式が違います。")
    .nonempty("メールアドレスは必須です。"),
  password: z.string().nonempty("パスワードは必須です。"),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const signUpSchema = z
  .object({
    name: z.string().nonempty("ユーザー名は必須です"),
    email: z
      .email("メールアドレスの形式が違います。")
      .nonempty("メールアドレスは必須です。"),
    password: z
      .string()
      .nonempty("パスワードは必須です。")
      .min(4, "4文字以上必要です。"),
    confirmPassword: z.string().nonempty("再確認パスワードは必須です。"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom", // ← 最新はこれ
        message: "パスワードが一致しません",
        path: ["confirmPassword"],
      });
    }
  });

export type SignUpForm = z.infer<typeof signUpSchema>;

const tagsInputSchema = z
  .string()
  .transform((value) => {
    if (value.trim() === "") return [];
    return value
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v.length > 0);
  })
  .refine((tags) => tags.length <= 5, "タグは5つまで")
  .refine(
    (tags) => tags.every((t) => t.length >= 3),
    "タグは3文字以上にしてください",
  )
  .refine(
    (tags) => tags.every((t) => t.length <= 30),
    "30文字以内にしてください",
  )
  .refine((tags) => new Set(tags).size === tags.length, {
    message: "タグが重複しています",
  });

const urlSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, validationSizeMessage("URL", 5, 100))
    .max(100, validationSizeMessage("URL", 5, 100)),
  url: z.url("正しいURLを入力してください"),
});

const urlsSchema = z.array(urlSchema).max(5, "url追加は5つまでです");

export const articleContentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(4, validationSizeMessage("タイトル", 4, 100))
    .max(100, validationSizeMessage("タイトル", 4, 100)),
  tags: tagsInputSchema,
  content: z.string().min(10, validationMaxMessage("記事", 10)),
});

export const articleMetaSchema = z.object({
  categoryId: z
    .union([z.number(), z.literal("")])
    .refine((val) => val !== "", {
      message: validationRequiredMessaege("カテゴリー"),
    })
    .transform((val) => Number(val)),
  url: urlsSchema,
});

export const articleEditSchema = z.object({
  ...articleContentSchema.shape,
  ...articleMetaSchema.shape,
});

export type ArticleEditForm = z.infer<typeof articleEditSchema>;

export const bookmarkCreateSchema = z.object({
  title: z
    .string()
    .trim()
    .min(4, validationSizeMessage("タイトル", 4, 40))
    .max(40, validationSizeMessage("タイトル", 4, 40)),
  url: z.url("正しいURLを入力してください"),
  memo: z.string().max(100, "100文字以内にしてください"),
});

export type BookmarkCreateForm = z.infer<typeof bookmarkCreateSchema>;
