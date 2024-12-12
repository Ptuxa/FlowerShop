import MainLayout from "../main/layout";

export default function CatalogLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <MainLayout>
            {children}
        </MainLayout>
    );
}