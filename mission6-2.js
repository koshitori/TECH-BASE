function addToTable() {
    // フォームから値を取得
    const date = document.getElementById('date').value;
    const cost = document.getElementById('cost').value;
    const note = document.getElementById('note').value;
    
    // 選択されたラジオボタンの値を取得
    const category = document.querySelector('input[name="category"]:checked');
    if (!category) {
        alert('支出の種類を選択してください');
        return;
    }

    // テーブルのtbody要素を取得
    const tableBody = document.getElementById('output-table').querySelector('tbody');

    // 新しい行の要素を作成
    const row = document.createElement('tr');

    // 日付のセルを作成して追加
    const dateCell = document.createElement('td');
    dateCell.textContent = date;
    row.appendChild(dateCell);

    // 金額のセルを作成して追加
    const costCell = document.createElement('td');
    costCell.textContent = cost;
    row.appendChild(costCell);

    // メモのセルを作成して追加
    const noteCell = document.createElement('td');
    noteCell.textContent = note;
    row.appendChild(noteCell);

    // カテゴリのセルを作成して追加
    const categoryCell = document.createElement('td');
    categoryCell.textContent = category.value;
    row.appendChild(categoryCell);

    // アクションセルを作成して追加
    const actionCell = document.createElement('td');

    // 削除ボタンの作成
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.onclick = function() {
        // クリックされたボタンの行を削除
        tableBody.removeChild(row);
        // 行削除後に合計を更新
        updateTotal();
        // 削除後のデータもcookiに保存
        saveTableData();
    };
    actionCell.appendChild(deleteButton);

    // アクションセルの追加
    row.appendChild(actionCell);

    // テーブルに新しい行を追加
    tableBody.appendChild(row);

    // フォームをリセット
    document.getElementById('userForm').reset();
    
    // 合計金額を更新
    updateTotal();

    // テーブルデータをCookieに保存
    saveTableData();
}

function updateTotal() {
    const tableBody = document.getElementById('output-table').querySelector('tbody');
    const rows = tableBody.getElementsByTagName('tr');
    let total = 0;

    for (let row of rows) {
        const costCell = row.getElementsByTagName('td')[1]; // コストは2番目のセル
        const cost = parseFloat(costCell.textContent) || 0;
        total += cost;
    }
    // 合計金額表示のための要素を更新
    document.getElementById('total-amount').textContent = total;
}

function saveTableData() {
    const tableBody = document.getElementById('output-table').querySelector('tbody');
    const rows = tableBody.getElementsByTagName('tr');
    const data = [];

    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        const rowData = {
            date: cells[0].textContent,
            cost: cells[1].textContent,
            note: cells[2].textContent,
            category: cells[3].textContent
        };
        data.push(rowData);
    }

    // データをJSON形式に変換してCookieに保存
    document.cookie = 'tableData=' + encodeURIComponent(JSON.stringify(data)) + '; path=/';
}

function loadTableData() {
    // 'tableData=' で始まるCookieを検索
    const cookie = document.cookie.split('; ').find(row => row.startsWith('tableData='));
    if (cookie) {
        // Cookieの値を取得し、JSON形式にデコード
        const data = JSON.parse(decodeURIComponent(cookie.split('=')[1]));

        // テーブルのtbody要素を取得
        const tableBody = document.getElementById('output-table').querySelector('tbody');

        // Cookieから取得したデータを使ってテーブルの行を作成
        data.forEach(rowData => {
            // 新しい行の要素を作成
            const row = document.createElement('tr');

            // 日付のセルを作成して追加
            const dateCell = document.createElement('td');
            dateCell.textContent = rowData.date;
            row.appendChild(dateCell);

            // 金額のセルを作成して追加
            const costCell = document.createElement('td');
            costCell.textContent = rowData.cost;
            row.appendChild(costCell);

            // メモのセルを作成して追加
            const noteCell = document.createElement('td');
            noteCell.textContent = rowData.note;
            row.appendChild(noteCell);

            // カテゴリのセルを作成して追加
            const categoryCell = document.createElement('td');
            categoryCell.textContent = rowData.category;
            row.appendChild(categoryCell);

            // アクションセルを作成して追加
            const actionCell = document.createElement('td');

            // 削除ボタンの作成
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '削除';
            deleteButton.onclick = function() {
                // クリックされたボタンの行を削除
                tableBody.removeChild(row);
                // 行削除後に合計を更新
                updateTotal();
                // 削除後のデータをCookieに保存
                saveTableData();
            };
            actionCell.appendChild(deleteButton);

            // アクションセルを行に追加
            row.appendChild(actionCell);

            // 行をテーブルのtbodyに追加
            tableBody.appendChild(row);
        });

        // 合計金額を更新
        updateTotal();
    }
}

window.onload = loadTableData;