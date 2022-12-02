import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
    const { data: session } = useSession()

    if (session) {
        return (
            <>
                Signed in as {session.user?.email} <br />
                <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={() => signOut()}>Sign out</button>
            </>
        )
    }

    return (
        <>
            Not signed in <br />
            <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={() => signIn()}>Sign in</button>
        </>
    )
}