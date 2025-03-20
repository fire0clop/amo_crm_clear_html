const BASE_URL = "https://egor666fomenko.amocrm.ru/api/v4";
let accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU5YTA5OWE3M2FjMTZiZGQ3OTZkZGYxZjU4NTkxMzY1ZDE1YjdhNjc0YjQxY2IwNDFmZDgxNGU2ZjI3ZDU5NTU3NjdiNzczMzQ3MjAyZjUzIn0.eyJhdWQiOiJjODdlZWM3OC0yYTRjLTQwZDItODhiZi03NzMzMWI0MTdiNTEiLCJqdGkiOiI1OWEwOTlhNzNhYzE2YmRkNzk2ZGRmMWY1ODU5MTM2NWQxNWI3YTY3NGI0MWNiMDQxZmQ4MTRlNmYyN2Q1OTU1NzY3Yjc3MzM0NzIwMmY1MyIsImlhdCI6MTc0MjQ0MTcwNSwibmJmIjoxNzQyNDQxNzA1LCJleHAiOjE3NDI1MjgxMDUsInN1YiI6IjEyMjY0MTM4IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMyMzAwMzQyLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiOGY5MzcwNzYtMDRkOS00MDY4LWI1MWQtZjZmNjJlMmViYzIzIiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.L-EtrvtTOJTKZZzOowr6hhvVeWR6K7gEnmOMfeOff4z80ogVGY64aGchty8mqjZxqz8Fjm9i0AhTxgXfKpH9xzq9UbwsYT7-TgC7i7S1BPcKd_qSdU5aoz1e0tXFhmuFUUdKb68akmZzJyaGAR984gEYVea3XvrRwBNiGLmn7V5bnib4loQ4SuRW0-sdSQVUGglayzZQEPYs6MsNixb6whT_lN37PKYJPcoXjCwDOF0S76zBQCmZSwRYiyT-D8Kg_kDFxt0UhLyzZiYiOMEGjqIeFFMu1GJPF_L7As0kOxi2RAcE_hyulBWak-gSmhExg0OdklaJa6ccaYHUclWCWw";
let refreshToken = "def50200d1e090d34c8bcd0e91302960dec93bb4012ee4119805ba58e485ab0f4fc9d37719abea01fc243155ce153dc4a5f05bcab80f9279133a783fdb1d6234ee3a7c72a5bbc3216e9761a372426ab6409c357c51cf7de693c4efb1cd6f2e3b5c6124a3cb9ca0d0d6fd6523ddf18fe691521e0b527b5b8dedf55cdfc8d1e1967a97fab50211924cc9883ec45916210489376674deb6c0e16df610695c173de9bbd569d9874157ca6e9d0f5e8a27667bb2a701054a70d110c6a9533adef0454da2eadd1e200d53e7d616cc4010e8f75af1815264c9670a0c0e01b9bae11212fe0e3a69af5b900a3a62341a1456800eb1d4c1fffd65c626bd4b66f2008782db79c47be437907881980d6de29f932ca0e11b6e098174f206ba3772d54a0556cab397bfbc9a409abc64861f60a2307dc8e1577cec2ff8b4e99090c21f01a32f8567883ea2925e7092a89989717a900edd39cce4d11754ec214d9e618502a0c7e87ad7b5627c9c78b050dc40c4578bfca4a0eddb150ac9ecd12fbd68d1807e9c19173f2386bc7ef53fc21992c3d7216d07288df1fc1ef746d5336bdcad6ac7ba95e72f99ec6d3c5cc54863c1f2152151566b486f1b2317fbd96c03ce97ae819ccfe934a6ca2aad75ab40381c4ed1341bf2ce407678e0941cd20ad0f1b21687f6458c43c217df607dfd7b17780c76da47";
const CLIENT_ID = "c87eec78-2a4c-40d2-88bf-77331b417b51";
const CLIENT_SECRET = "tawDK0TfcOWFt23BEcjVAjRCfYlWfdOgsiFN3wJl1aMk0FqCRtWZm8dSxIrdveKI";
const REDIRECT_URI = "http://localhost:3000";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
let requestCount = 0;
let lastRequestTime = 0;

async function refreshAccessToken() {
    const url = `${BASE_URL}/oauth2/access_token`;
    const body = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        redirect_uri: REDIRECT_URI,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            const data = await response.json();
            accessToken = data.access_token;
            refreshToken = data.refresh_token;
            console.log("Токен обновлен");
            return true;
        }
        console.error("Ошибка обновления токена:", await response.text());
        return false;
    } catch (error) {
        console.error("Ошибка при обновлении токена:", error);
        return false;
    }
}

async function makeRequest(endpoint) {
    const now = Date.now();
    if (requestCount >= 2 && (now - lastRequestTime) < 1000) {
        await delay(1000 - (now - lastRequestTime));
        requestCount = 0;
    }

    const url = `${BASE_URL}${endpoint}`;
    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json"
            },
        });

        if (response.status === 401) {
            const refreshed = await refreshAccessToken();
            if (refreshed) {
                return makeRequest(endpoint);
            }
            return null;
        }

        if (!response.ok) {
            console.error("Ошибка запроса:", await response.text());
            return null;
        }

        requestCount++;
        lastRequestTime = Date.now();
        return await response.json();
    } catch (error) {
        console.error("Ошибка выполнения запроса:", error);
        return null;
    }
}

async function fetchDealsAndContacts() {
    const data = await makeRequest("/leads?with=contacts");
    if (!data || !data._embedded || !data._embedded.leads) {
        console.error("Нет данных о сделках");
        return [];
    }

    const deals = data._embedded.leads;
    const result = [];

    for (let i = 0; i < deals.length; i++) {
        const deal = deals[i];
        let contactData = null;

        if (deal._embedded?.contacts?.length > 0) {
            const contactId = deal._embedded.contacts[0].id;
            contactData = await makeRequest(`/contacts/${contactId}`);
        }

        result.push({
            dealId: deal.id,
            dealName: deal.name || "Без названия",
            budget: deal.price || 0,
            contactName: contactData?.name || "Нет контакта",
            contactPhone: contactData?.custom_fields_values?.find(f => f.field_code === "PHONE")?.values[0]?.value || "Не указан"
        });
    }
    return result;
}

let openRow = null;

async function fetchDealDetails(dealId) {
    const data = await makeRequest(`/leads/${dealId}?with=tasks`);
    if (!data) return null;

    const taskStatus = calculateTaskStatus(data.closest_task_at);
    return {
        name: data.name || "Без названия",
        id: data.id,
        date: new Date(data.created_at * 1000).toLocaleDateString("ru-RU"),
        taskStatus
    };
}

function calculateTaskStatus(closestTaskTimestamp) {
    if (!closestTaskTimestamp) return "expired";

    const taskDate = new Date(closestTaskTimestamp * 1000);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    taskDate.setHours(0, 0, 0, 0);

    const diffDays = (taskDate - today) / (1000 * 60 * 60 * 24);

    if (diffDays < 0) return "expired";
    if (diffDays === 0) return "today";
    return "future";
}

function getTaskStatusSvg(status) {
    const statusClass = status === "today" ? "status-green" :
        status === "future" ? "status-yellow" :
            "status-red";
    return `<span class="circle-status ${statusClass}"></span>`;
}

function createDealRow(deal) {
    const row = document.createElement("tr");
    row.dataset.original = `
        <td>${deal.dealId}</td>
        <td>${deal.dealName}</td>
        <td>${deal.budget}</td>
        <td>${deal.contactName}</td>
        <td>${deal.contactPhone}</td>
    `;
    row.innerHTML = row.dataset.original;

    row.addEventListener("click", async (e) => {
        if (openRow && openRow !== row) {
            openRow.innerHTML = openRow.dataset.original;
        }

        if (row.classList.contains("expanded")) {
            row.innerHTML = row.dataset.original;
            row.classList.remove("expanded");
            openRow = null;
            return;
        }

        row.innerHTML = `<td colspan="5" class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></td>`;
        const details = await fetchDealDetails(deal.dealId);

        if (details) {
            row.innerHTML = `
                <td colspan="5">
                    <p><strong>Название:</strong> ${details.name}</p>
                    <p><strong>ID:</strong> ${details.id}</p>
                    <p><strong>Дата:</strong> ${details.date}</p>
                    <p><strong>Статус задачи:</strong> ${getTaskStatusSvg(details.taskStatus)}</p>
                </td>
            `;
            row.classList.add("expanded");
            openRow = row;
        }
    });

    return row;
}

async function renderDeals() {
    const tableBody = document.getElementById("deals-table");
    tableBody.innerHTML = '<tr class="loading"><td colspan="5">Загрузка данных...</td></tr>';

    const deals = await fetchDealsAndContacts();
    if (!deals.length) {
        tableBody.innerHTML = '<tr><td colspan="5">Нет данных</td></tr>';
        return;
    }

    tableBody.innerHTML = ""; // Очищаем таблицу после загрузки данных
    let index = 0;

    async function addDealsBatch() {
        // Добавляем до 2 сделок за раз
        for (let i = 0; i < 2 && index < deals.length; i++) {
            const deal = deals[index];
            const row = createDealRow(deal);
            tableBody.appendChild(row);
            index++;
        }

        // Если остались сделки, ждем секунду и добавляем следующую пару
        if (index < deals.length) {
            await delay(1000);
            await addDealsBatch();
        }
    }

    await addDealsBatch();
}

renderDeals();