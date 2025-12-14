module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/types/cotação.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CotacaoStatus",
    ()=>CotacaoStatus
]);
var CotacaoStatus = /*#__PURE__*/ function(CotacaoStatus) {
    CotacaoStatus["ABERTA"] = "ABERTA";
    CotacaoStatus["FECHADA"] = "FECHADA";
    return CotacaoStatus;
}({});
}),
"[project]/src/app/api/cotacoes/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$cota$e7e3$o$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/cotação.ts [app-route] (ecmascript)");
;
;
let cotacoes = [
    {
        id: 1,
        nome: 'Cotação 001 - Materiais de Construção',
        dataInicio: '2025-01-10',
        dataFim: '2025-01-25',
        status: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$cota$e7e3$o$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CotacaoStatus"].ABERTA
    },
    {
        id: 2,
        nome: 'Cotação 002 - Equipamentos de TI',
        dataInicio: '2025-02-01',
        dataFim: '2025-02-15',
        status: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$cota$e7e3$o$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CotacaoStatus"].FECHADA
    },
    {
        id: 3,
        nome: 'Cotação 003 - Material de Escritório',
        dataInicio: '2025-03-01',
        dataFim: '2025-03-20',
        status: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$cota$e7e3$o$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CotacaoStatus"].ABERTA
    }
];
async function GET() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(cotacoes);
}
async function POST(request) {
    try {
        const novaCotacao = await request.json();
        const novoId = cotacoes.length > 0 ? Math.max(...cotacoes.map((c)=>c.id)) + 1 : 1;
        const cotacaoComId = {
            ...novaCotacao,
            id: novoId
        };
        cotacoes.push(cotacaoComId);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(cotacaoComId, {
            status: 201
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Erro ao criar cotação'
        }, {
            status: 400
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__32edb2d2._.js.map