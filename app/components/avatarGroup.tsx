import { User } from "@prisma/client"
import Image from "next/image"

interface Props {
    users: User[]
}

export default function AvatarGroup({
    users = [],
}: Props) {
    const slicedUsers = users.slice(0, users.length)
    const positionMap = {
        0: 'top-0 left-[12px]',
        1: 'bottom-0',
        2: 'bottom-0 right-0'
    }
    return (
        <div className="
            relative
            h-11
            w-11
        ">
            {slicedUsers.map((item, i) => (
                <div
                    key={item.id}
                    className={`
                        absolute
                        inline-block
                        rounded-full
                        overflow-hidden
                        w-[21px]
                        h-[21px]
                        ${positionMap[i as keyof typeof positionMap]}
                    `}
                >
                    <Image
                        fill
                        src={item.image || `https://avatar.vercel.sh/${item.name}`}
                        alt="Avatar"
                    />
                </div>
            ))}
        </div>
    )
}