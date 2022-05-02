export const mapUserData = (user) => {
  const { uid, email, xa, displayName, photoUrl } = user;

  return {
    id: uid,
    email,
    name: displayName,
  };
};
