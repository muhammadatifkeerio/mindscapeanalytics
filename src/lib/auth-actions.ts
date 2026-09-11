import { authClient } from "@/lib/auth-client";
import type { useRouter } from "next/navigation";

type AppRouter = ReturnType<typeof useRouter>;

export async function signOutAndRedirect(router: AppRouter): Promise<void> {
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                router.push("/");
                router.refresh();
            },
        },
    });
}
