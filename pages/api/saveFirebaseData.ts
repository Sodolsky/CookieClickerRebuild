import { doc, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase";
import { firebaseAndUtilityObjectWithEmail } from "../../utils/interfaces";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const resObject = JSON.parse(req.body) as firebaseAndUtilityObjectWithEmail;
  const refGameLogic = doc(db, "Users", resObject.email);
  const refUtilityLogic = doc(db, "UsersUtils", resObject.email);
  try {
    await setDoc(refGameLogic, resObject.firebaseObject, { merge: true });
    await setDoc(refUtilityLogic, resObject.utilityObject, { merge: true });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Something on our side, went terribly wrong. If you expierience any form of progress loss, send an email to mateuszsodolskiofficial@gmail.com",
    });
  }
}
