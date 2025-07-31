// "use client";

// import React from "react";
// import { useDispatch } from "react-redux";
// import { setAuthState, setUserDetailsState } from "@/store/authSlice";

// export default function AuthWrapper({ children }: { children: React.ReactNode }) {
//   const dispatch = useDispatch();

//   if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "fake_api_key") {
//     console.warn(" Skipping Firebase Auth: Using dummy API key");
//     dispatch(setAuthState(true)); 
//     return <>{children}</>;
//   }

//   React.useEffect(() => {
//     (async () => {
//       const { getAuth, onAuthStateChanged } = await import("firebase/auth");
//       const { app } = await import("../../firebaseConfig");

//       const auth = getAuth(app);
//       onAuthStateChanged(auth, (user) => {
//         if (user) {
//           dispatch(setAuthState(true));
//           dispatch(
//             setUserDetailsState({
//               uid: user.uid,
//               name: user.displayName ?? "",
//               email: user.email ?? "",
//               profilePic: user.photoURL ?? "",
//             })
//           );
//         } else {
//           dispatch(setAuthState(false));
//         }
//       });
//     })();
//   }, [dispatch]);

//   return <>{children}</>;
// }



"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthState, setUserDetailsState } from "@/store/authSlice";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "fake_api_key") {
      console.warn("Skipping Firebase Auth: Using dummy API key");
      dispatch(setAuthState(true));
      return; // Exit effect early
    }

    (async () => {
      const { getAuth, onAuthStateChanged } = await import("firebase/auth");
      const { app } = await import("../../firebaseConfig");

      const auth = getAuth(app);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setAuthState(true));
          dispatch(
            setUserDetailsState({
              uid: user.uid,
              name: user.displayName ?? "",
              email: user.email ?? "",
              profilePic: user.photoURL ?? "",
            })
          );
        } else {
          dispatch(setAuthState(false));
        }
      });
    })();
  }, [dispatch]);

  return <>{children}</>;
}

