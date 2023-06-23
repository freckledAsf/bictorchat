export default function EmptyState() {
    return (
        <div className="
            relative    
            px-4
            py-10
            sm:px-6
            lg:px-8
            h-full
            flex
            justify-center
            items-center
            bg-[#E2DAD6]
            dark:bg-gray-950
        ">
            <div className="
                z-0
                inset-0
                absolute
                opacity-5
                bg-[url('/bg.png')]
                invert
                dark:opacity-10
                dark:invert-0
            "/>
            <div className="
                text-center
                items-center
                flex
                flex-col
            ">
                <h3 className="
                    mt-2
                    text-2xl
                    font-semibold
                    text-gray-900
                    dark:text-gray-200
                ">
                    Select a chat or start a new conversation
                </h3>
            </div>
        </div>
    )
}