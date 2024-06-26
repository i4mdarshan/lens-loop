import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { CreatePostValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  useCreatePost,
  useUpdatePost,
} from "@/lib/react-query/queriesAndMutations";
import Loader from "../shared/Loader";
import { toPascalCase } from "@/lib/utils";

type PostFormProps = {
  post?: Models.Document;
  action: "create" | "update";
};

const PostForm = ({ action, post }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();

  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof CreatePostValidation>>({
    resolver: zodResolver(CreatePostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CreatePostValidation>) {
    if (post && action === "update") {
      // console.log(values);

      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageURL: post?.imageURL,
      });

      if (!updatedPost) {
        toast({
          variant: "destructive",
          title: "Something went wrong. Please try again!",
        });
      }

      return navigate("/");
    }

    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      return toast({
        title: "Post could not be uploaded. Please try again !",
        variant: "destructive",
      });
    }

    navigate("/");
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-9 w-full max-w-5xl'
        >
          <FormField
            control={form.control}
            name='caption'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Caption</FormLabel>
                <FormControl>
                  <Textarea
                    className='shad-textarea custom-scrollbar'
                    placeholder='Enter caption...'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='file'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Add Photos</FormLabel>
                <FormControl>
                  <FileUploader
                    fieldChange={field.onChange}
                    mediaURL={post?.imageURL}
                  />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Add Location</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    className='shad-input'
                    placeholder='Eg: Mumbai, Maharashtra'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>
                  Add Tags (separated by comma ",")
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    className='shad-input'
                    placeholder='Eg: Art, Expression, Learn'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />
          <div className='flex gap-4 items-center justify-end'>
            {!isLoadingCreate || !isLoadingUpdate ? (
              <Button type='button' className='shad-button_dark_4'>
                Cancel
              </Button>
            ) : (
              ""
            )}
            <Button
              type='submit'
              className='shad-button_primary whitespace-nowrap'
              disabled={isLoadingCreate || isLoadingUpdate}
            >
              {isLoadingCreate || isLoadingUpdate ? (
                <div className='flex-center gap-2'>
                  <Loader /> Uploading...
                </div>
              ) : (
                toPascalCase(action)
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default PostForm;
