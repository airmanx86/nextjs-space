import SignOut from "@/components/Signout";

export default function Page() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <div className="w-full max-w-md">
                <div className="flex items-center justify-between">
                    <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        <SignOut />
                    </ div>
                </div>
            </div>
        </div>
    );
}