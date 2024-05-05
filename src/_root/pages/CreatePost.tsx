import CreatePostForm from "@/components/forms/CreatePostForm";

const CreatePost = () => {
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='mx-w-5xl flex-start gap-3 justify-start w-full'>
          <img
            src='/assets/icons/add-post.svg'
            alt='create-post'
            height={36}
            width={36}
          />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Create Post</h2>
        </div>
        <CreatePostForm></CreatePostForm>
      </div>
    </div>
  );
};

export default CreatePost;
