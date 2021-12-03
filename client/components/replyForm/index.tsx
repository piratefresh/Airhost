<form onSubmit={handleSubmit(onReply)} className="flex flex-col w-full">
  <TextField
    label={`Comment as`}
    placeholder="Whats your thoughts?"
    name="text"
    register={register}
    errorMsg={errors.text}
  ></TextField>
  <button
    className="bg-yellow-400 p-2 rounded-md text-white font-medium my-4 text-lg"
    type="submit"
  >
    Comment
  </button>
</form>;
