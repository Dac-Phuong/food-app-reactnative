import Onboarding from "../screens/Onboarding";
import Splash from "../screens/Splash";
import Register from "../screens/auth";

export default function (Stack) {
  return (
    <>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Register" component={Register} />
    </>
  );
}
