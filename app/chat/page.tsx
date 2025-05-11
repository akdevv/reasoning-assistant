import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ChatPage() {
	const session = await auth();

	if (!session?.user) {
		redirect("/auth/login");
	}

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-7xl mx-auto p-4">
				<h1 className="text-2xl font-bold mb-4">
					Welcome, {session.user.name || "User"}!
				</h1>
				<div className="bg-background-light rounded-lg p-4">
					<p>Your chat interface will appear here.</p>
				</div>
			</div>
		</div>
	);
}
