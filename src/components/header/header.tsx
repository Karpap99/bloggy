'use client'
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { userSliceActions } from "@/lib/slices/user";
import Link from "next/link";

export const Header = () => {
    const dispatch = useAppDispatch();
    const { user, isAuthed } = useAppSelector(state => state.user);

    const handleLogout = () => {
        dispatch(userSliceActions.setAuthed(false));
        dispatch(userSliceActions.setUser(null));
    }

    return (
        <header className="w-full h-16 p-4 flex items-center justify-center border-b border-gray-300 sticky top-0 bg-white dark:bg-black z-10">
            <h1 className="text-2xl font-bold">Bloggy</h1>
            <nav className="ml-auto flex gap-4">
                <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>

                {isAuthed ? (
                    <>
                        <Link href="/post/create" className="text-gray-600 hover:text-gray-900">
                            Create Post
                        </Link>
                        <button
                            className="text-gray-600 hover:text-gray-900 cursor-pointer"
                            onClick={handleLogout}
                        >
                            {user?.email}
                        </button>
                    </>
                ) : (
                    <Link href="/auth" className="text-gray-600 hover:text-gray-900">
                        Log in
                    </Link>
                )}
            </nav>
        </header>
    );
}