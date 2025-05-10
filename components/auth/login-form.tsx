"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
	const router = useRouter();

	return (
		<Card className=" bg-background-light border-none rounded-lg p-4 mx-auto max-w-sm">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl text-center text-foreground">
					Login
				</CardTitle>
				<CardDescription className="text-center text-foreground-dark">
					Continue with Google to access your account
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<Button
					variant="outline"
					onClick={() => {}}
					className="bg-background text-foreground border-none hover:bg-black hover:text-foreground-dark"
				>
					<FaGoogle className="mr-2" />
					<span className="font-bold">Continue with Google</span>
				</Button>
			</CardContent>
			<CardFooter className="flex flex-col items-center">
				<p className="text-center text-sm text-foreground-dark mb-2">
					Don&apos;t have an account?
				</p>
				<Button
					variant="link"
					className="text-accent-blue hover:text-accent-blue-hover"
					onClick={() => router.push("/auth/register")}
				>
					Register
				</Button>
			</CardFooter>
		</Card>
	);
}
