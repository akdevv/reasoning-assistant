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
import { FiLoader } from "react-icons/fi";
import { MdOutlineErrorOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleGoogleLogin = async () => {
		setIsLoading(true);
		try {
			console.log("Signing in with Google");
			const res = await signIn("google", {
				callbackUrl: "/chat",
			});
			console.log("res", res);
		} catch (error) {
			console.error(error);
			setError("Failed to sign in with Google");
		} finally {
			setIsLoading(false);
		}
	};
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
					onClick={handleGoogleLogin}
					disabled={isLoading}
					className="bg-background text-foreground border-none hover:bg-black hover:text-foreground-dark"
				>
					{isLoading ? (
						<FiLoader className="mr-2 animate-spin" />
					) : (
						<>
							<FaGoogle className="mr-2" />
							<span className="font-bold">
								Continue with Google
							</span>
						</>
					)}
				</Button>
				{error && (
					<div className="flex items-center justify-center gap-2">
						<MdOutlineErrorOutline className="text-xl text-red-500" />
						<p className="text-center text-sm text-red-500">
							{error || "Something went wrong!"}
						</p>
					</div>
				)}
			</CardContent>
			<CardFooter className="flex flex-col items-center">
				<p className="text-center text-sm text-foreground-dark mb-2">
					Don&apos;t have an account?
				</p>
				<Button
					variant="link"
					className="text-accent-blue hover:text-accent-blue-hover"
					asChild
				>
					<Link href="/auth/register">Register</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
