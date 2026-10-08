"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductsManagerUseCase } from "../use-cases/ProductsManagerUseCase";
import { UsersManagerUseCase } from "../use-cases/UsersManagerUseCase";
import { useAuthContext } from "../providers/AuthTokenProvider";
import ResumenView from "./ResumenView";

export function DashboardView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"users" | "products" | "resumen">("products");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { userRole, isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated) {
    } else {
      setIsAuthorized(true);

      if (userRole !== "ADMIN" && activeTab !== "resumen") {
        setActiveTab("resumen");
      }
    }
  }, [isAuthenticated, userRole]);

  if (!isAuthorized && isAuthenticated) {
    // If authenticated but we haven't set authorized yet
  } else if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FBFBFD] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#FBFBFD] text-gray-800">
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex space-x-4 border-b border-gray-200 pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab("resumen")}
              className={`px-4 py-2 font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                activeTab === "resumen"
                  ? "bg-gray-100 text-cyan-600 border-b-2 border-cyan-600"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Resumen e Interacciones
            </button>
            {userRole === "ADMIN" && (
              <>
                <button
                  onClick={() => setActiveTab("products")}
                  className={`px-4 py-2 font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                    activeTab === "products"
                      ? "bg-gray-100 text-cyan-600 border-b-2 border-cyan-600"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  Productos
                </button>
                <button
                  onClick={() => setActiveTab("users")}
                  className={`px-4 py-2 font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                    activeTab === "users"
                      ? "bg-gray-100 text-cyan-600 border-b-2 border-cyan-600"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  Usuarios
                </button>
              </>
            )}
          </div>
        </div>

        {activeTab === "resumen" && <ResumenView />}
        {activeTab === "products" && userRole === "ADMIN" && (
          <ProductsManagerUseCase />
        )}
        {activeTab === "users" && userRole === "ADMIN" && (
          <UsersManagerUseCase />
        )}
      </main>
    </div>
  );
}
