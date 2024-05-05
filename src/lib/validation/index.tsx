import * as z from "zod";

export const SignUpValidation = z.object({
  name: z.string().min(2, { message: "Too short" }),
  username: z.string().min(2, { message: "Too short" }).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

const MAX_FILE_SIZE = 5000000;
function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "docx" || fileType === "pdf") return true;
  }
  return false;
}
export const CreatePostValidation = z.object({
  caption: z.string().max(2200),
  file: z
    .custom<File[]>()
    .refine((file: File[]) => file?.length !== 0, "File is required"),
  location: z.string().max(100),
  tags: z.string(),
});
