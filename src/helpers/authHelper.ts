export const createMockJwtToken = (payload: object): string => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const base64Header = btoa(JSON.stringify(header));
  const base64Payload = btoa(JSON.stringify(payload));
  const base64Signature = btoa("mockSignature");

  return `${base64Header}.${base64Payload}.${base64Signature}`;
};
