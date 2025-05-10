import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-custom-background p-4">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-custom-foreground-light">
						Welcome Back
					</h1>
					<p className="text-custom-foreground-dark mt-2">
						Sign in to access your Reasoning Assistant
					</p>
				</div>
				<LoginForm />
			</div>
		</div>
	);
}
