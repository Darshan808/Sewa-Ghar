import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {

  return (
    <>
      <Stack>
        <Stack.Screen
          name="customer"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="serviceProvider"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar style="dark" />
    </>
  );
};

export default AuthLayout;
