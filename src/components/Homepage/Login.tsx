import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import LoginCard from "./LoginCard"

const Login = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-4 p-8">
            <Tabs defaultValue="employer" className="lg:w-[500px] w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="employer">Employer</TabsTrigger>
                    <TabsTrigger value="employee">Employee</TabsTrigger>
                </TabsList>
                <TabsContent value="employer">
                    <LoginCard user={"Employer"} />
                </TabsContent>
                <TabsContent value="employee">
                    <LoginCard user={"Employee"} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Login