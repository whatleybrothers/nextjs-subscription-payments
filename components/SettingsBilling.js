import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { useAuth } from '../utils/auth';
// import { redirectToBilling } from "util/stripe";

function SettingsBilling(props) {
  // const router = useRouter();
  // const auth = useAuth();
  // const [loading, setLoading] = useState(true);
  //
  // useEffect(() => {
  //   if (auth.user.planIsActive) {
  //     // If user has an active plan then
  //     // take them to Stripe billing
  //     redirectToBilling().catch((error) => {
  //       setLoading(false);
  //       props.onStatus({
  //         type: "error",
  //         message: error.message,
  //       });
  //     });
  //   } else {
  //     // Otherwise go to pricing so they can
  //     // purchase a plan
  //     router.replace("/pricing");
  //   }
  //
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // return <>{loading && <div>Loading...</div>}</>;
  return     <h1>Settings Password</h1>

}

export default SettingsBilling;
