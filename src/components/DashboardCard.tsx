interface PropsType {
    title: string;
    value: number;
    icon: React.ElementType
}

const DashboardCard = ({
    title,
    value,
    icon: Icon
}: PropsType) => {
    return (
        <div className="w-full border rounded-md p-4 flex flex-col items-start gap-4">
            <div className="w-full flex items-center justify-between">
                <h4 className="font-medium md:text-sm text-xs">{title}</h4>
                <Icon className="size-4 dark:text-neutral-400 text-neutral-800" />
            </div>
            <h2 className="md:text-3xl text-xl font-semibold">
                {value}
            </h2>
        </div>
    )
}

export default DashboardCard