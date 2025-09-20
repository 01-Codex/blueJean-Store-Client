import Header from "@/components/header";

export default function WithLayout({children}){
    return(
        <>
            <Header/>
            <div className="container">
                {children}
            </div>
        </>
    )
}