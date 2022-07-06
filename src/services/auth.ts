import { supabase } from "./supabaseClient";

// SignIn function
export const signIn = async ({
  email,
  password,
}: {
  email: any;
  password: any;
}) => {
  const { error } = await supabase.auth.signIn({ email, password });

  if (error) {
    alert("Error...");
    throw Error(error.message);
  }
};

export const signUp = async ({
  email,
  password,
  username,
}: {
  email: any;
  password: any;
  username: any;
}) => {
  const { error } = await supabase.auth.signUp(
    { email, password },
    { data: { username: username } }
  );

  if (error) {
    throw Error(error.message);
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw Error(error.message);
  }
};
