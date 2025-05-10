import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-custom-background p-4">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-custom-foreground-light">
						Create an Account
					</h1>
					<p className="text-custom-foreground-dark mt-2">
						Join Chain of Thought to solve complex problems
					</p>
				</div>
				<RegisterForm />
			</div>
		</div>
	);
}
