import LoginForm from "@/components/modules/Auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT: Form panel */}
        <div className="flex flex-col">
          {/* Top bar (mobile + desktop) */}
          <div className="flex items-center justify-between px-4 py-4 lg:px-8">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="Logo" className="h-8 w-8 lg:hidden" />
              <span className="text-sm font-semibold lg:hidden">Transport Module</span>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center px-4 pb-10 lg:px-10">
            <div className="w-full max-w-md">
              <h1 className="mb-2 text-2xl font-semibold">Login to continue</h1>
              <p className="mb-6 text-sm text-muted-foreground">Enter your credentials to access the dashboard.</p>

              <LoginForm />
            </div>
          </div>
        </div>

        {/* RIGHT: Image panel */}
        <div className="relative hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=80"
            alt="Classroom"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />

          {/* Logo + text */}
          <div className="absolute left-8 top-8 flex items-center gap-3">
            <img src="/logo.svg" alt="Logo" className="h-10 w-10" />
            <div className="text-white">
              <p className="text-lg font-semibold">Transport Module</p>
              <p className="text-sm opacity-90">School Management System</p>
            </div>
          </div>

          <div className="absolute bottom-10 left-8 right-8 text-white">
            <h2 className="text-3xl font-bold leading-tight">Stay on top of transport operations</h2>
            <p className="mt-3 text-sm opacity-90">
              Login to manage routes, vehicles, pickup points, and student transport fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
