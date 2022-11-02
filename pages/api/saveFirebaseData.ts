import { doc, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase";
import { firebaseObjectAndUserEmail } from "../../utils/interfaces";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const resObject = JSON.parse(req.body) as firebaseObjectAndUserEmail;
  const ref = doc(db, "Users", resObject.email);
  try {
    await setDoc(ref, resObject.firebaseObject, { merge: true });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Something on our side, went terribly wrong. If you expierience any form of progress loss, send and email to mateuszsodolskiofficial@gmail.com",
    });
  }
}
