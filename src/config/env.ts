interface EnvVars {
    BASE_URL: string;
  }
  
  const loadEnvironmentVariables = (): EnvVars => {
    const requiredVariables: string[] = ["BASE_URL"];
  
    requiredVariables.forEach((key) => {
      if (!import.meta.env[key]) {
        throw new Error(`Missing required environments variable: ${key}`);
      }
    });
    return {
      BASE_URL: import.meta.env.VITE_BASE_URL as string,
    };
  };
  
  export const envVars: EnvVars = loadEnvironmentVariables();
  