/**
 * Automated Test Suite for Assignment 4: Product Catalog REST API Route Handlers
 * Run with: npm run test:api (ensure dev server is running on port 3000)
 */

const PORT = process.env.PORT || 3000;
const baseUrl = `http://localhost:${PORT}/api/products`;

async function runTests() {
    console.log(`\n======================================================`);
    console.log(`  Assignment 4: Product Catalog REST API Wrapper Tests`);
    console.log(`  Target: ${baseUrl}`);
    console.log(`======================================================\n`);

    let passed = 0;
    let total = 0;

    function recordTest(name, isPass, details) {
        total++;
        if (isPass) {
            passed++;
            console.log(`✔ [PASS] ${name}`);
        } else {
            console.log(`✖ [FAIL] ${name}`);
        }
        if (details) {
            console.log(`   └─ ${details}`);
        }
        console.log("");
    }

    // Test 1: GET /api/products with pagination & data mapping
    try {
        const res = await fetch(`${baseUrl}?page=1&pageSize=2`);
        const json = await res.json();
        const isValidShape =
            json.products &&
            Array.isArray(json.products) &&
            json.products.length > 0 &&
            "id" in json.products[0] &&
            "name" in json.products[0] &&
            "price" in json.products[0] &&
            "category" in json.products[0];
        const isPass =
            res.status === 200 &&
            json.page === 1 &&
            json.pageSize === 2 &&
            json.totalRecords > 0 &&
            isValidShape;
        recordTest(
            "TEST 1: GET /api/products (Pagination & Schema Mapping)",
            isPass,
            `Status: ${res.status} | Total Records: ${json.totalRecords} | Total Pages: ${json.totalPages} | Sample: "${json.products[0]?.name}" (₹${json.products[0]?.price})`
        );
    } catch (err) {
        recordTest(
            "TEST 1: GET /api/products",
            false,
            `Network error: ${err instanceof Error ? err.message : String(err)}`
        );
    }

    // Test 2: GET /api/products/[id] (Valid ID)
    try {
        const res = await fetch(`${baseUrl}/1`);
        const json = await res.json();
        const isPass = res.status === 200 && json && json.id === 1 && Boolean(json.name);
        recordTest(
            "TEST 2: GET /api/products/1 (Single Product Retrieval)",
            isPass,
            `Status: ${res.status} | Product: "${json?.name}" | Price: ₹${json?.price} | Rating: ${json?.rating}`
        );
    } catch (err) {
        recordTest(
            "TEST 2: GET /api/products/1",
            false,
            `Network error: ${err instanceof Error ? err.message : String(err)}`
        );
    }

    // Test 3: GET /api/products/[id] (404 Not Found)
    try {
        const res = await fetch(`${baseUrl}/9999999`);
        const json = await res.json();
        const isPass = res.status === 404 && Boolean(json.error);
        recordTest(
            "TEST 3: GET /api/products/9999999 (404 Non-existent ID)",
            isPass,
            `Status: ${res.status} | Error: "${json?.error}"`
        );
    } catch (err) {
        recordTest(
            "TEST 3: GET /api/products/9999999",
            false,
            `Network error: ${err instanceof Error ? err.message : String(err)}`
        );
    }

    // Test 4: GET /api/products/invalid-id (400 Bad Request)
    try {
        const res = await fetch(`${baseUrl}/invalid-id`);
        const json = await res.json();
        const isPass = res.status === 400 && Boolean(json.error);
        recordTest(
            "TEST 4: GET /api/products/invalid-id (400 Invalid ID Validation)",
            isPass,
            `Status: ${res.status} | Error: "${json?.error}"`
        );
    } catch (err) {
        recordTest(
            "TEST 4: GET /api/products/invalid-id",
            false,
            `Network error: ${err instanceof Error ? err.message : String(err)}`
        );
    }

    // Test 5: POST /api/products (400 Validation Failure - missing required fields)
    try {
        const res = await fetch(baseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Incomplete Product" }),
        });
        const json = await res.json();
        const isPass = res.status === 400 && Boolean(json.error);
        recordTest(
            "TEST 5: POST /api/products (400 Missing Required Fields)",
            isPass,
            `Status: ${res.status} | Error: "${json?.error}"`
        );
    } catch (err) {
        recordTest(
            "TEST 5: POST /api/products",
            false,
            `Network error: ${err instanceof Error ? err.message : String(err)}`
        );
    }

    // Test 6: PUT /api/products/1 (400 Validation Failure - negative price)
    try {
        const res = await fetch(`${baseUrl}/1`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price: -50 }),
        });
        const json = await res.json();
        const isPass = res.status === 400 && Boolean(json.error);
        recordTest(
            "TEST 6: PUT /api/products/1 (400 Negative Price Validation)",
            isPass,
            `Status: ${res.status} | Error: "${json?.error}"`
        );
    } catch (err) {
        recordTest(
            "TEST 6: PUT /api/products/1",
            false,
            `Network error: ${err instanceof Error ? err.message : String(err)}`
        );
    }

    // Test 7: DELETE /api/products/9999999 (Upstream Status & Resilience)
    try {
        const res = await fetch(`${baseUrl}/9999999`, {
            method: "DELETE",
        });
        const json = await res.json();
        const isPass =
            (res.status === 404 || res.status === 401 || res.status === 400) &&
            Boolean(json.error);
        recordTest(
            "TEST 7: DELETE /api/products/9999999 (Upstream Status Handling)",
            isPass,
            `Status: ${res.status} | Captured Response: "${json?.error}"`
        );
    } catch (err) {
        recordTest(
            "TEST 7: DELETE /api/products/9999999",
            false,
            `Network error: ${err instanceof Error ? err.message : String(err)}`
        );
    }

    console.log(`------------------------------------------------------`);
    console.log(
        `  Results: ${passed} / ${total} tests passed (${Math.round((passed / total) * 100)}%)`
    );
    console.log(`======================================================\n`);

    if (passed !== total) {
        process.exit(1);
    }
}

runTests();
