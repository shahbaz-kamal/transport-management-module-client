import { registerSchema } from "@/schemas/registerFormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";
import { FieldDescription } from "@/components/ui/field";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

// shadcn Select
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type RegisterFormValues = z.infer<typeof registerSchema>;

const roles = [
  { label: "Student", value: "STUDENT" },
  { label: "Admin", value: "ADMIN" },
  { label: "Super Admin", value: "SUPER_ADMIN" },
] as const;

const RegisterForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "STUDENT",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    // Example payload
    // If you have an API, call it here.
    console.log("Register payload:", values);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">This is your public display name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Email" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">This is your email address</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role dropdown */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role *</FormLabel>
                    <FormControl>
                      <Select value={field.value as string} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((r) => (
                            <SelectItem key={r.value} value={r.value}>
                              {r.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription className="sr-only">Select your role</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Password {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">This is your password</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* confirmPassword field exists in your JSX, so keep it only if your schema has it */}
              <FormField
                control={form.control}
                name={"confirmPassword" as any}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password *</FormLabel>
                    <FormControl>
                      <Password {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">Confirm your password</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FieldDescription className="text-center">
                Already have an account?{" "}
                <span className="font-semibold underline-offset-4 hover:underline dark:text-primary-foreground">
                  <Link to="/login">Login now</Link>
                </span>
              </FieldDescription>

              <Button className="w-full hover:cursor-pointer" type="submit">
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;