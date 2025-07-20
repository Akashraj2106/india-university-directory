async function handleSearch() {
      const mode = document.getElementById("mode").value;
      const query = document.getElementById("search").value.trim().toLowerCase();
      const tbody = document.getElementById("tableBody");
      const table = document.getElementById("resultTable");
      tbody.innerHTML = "";

      if (!query) return alert("Please enter a search term!");

      let url = "http://universities.hipolabs.com/search?";
      url += mode === "country" ? `country=${query}` : `country=India`;

      try {
        const res = await axios.get(url);
        let data = res.data;

        if (mode === "state") {
          data = data.filter(univ =>
            univ.name.toLowerCase().includes(query) ||
            (univ["state-province"] && univ["state-province"].toLowerCase().includes(query))
          );
        }

        if (data.length === 0) {
          table.style.display = "none";
          alert("No universities found.");
          return;
        }

        table.style.display = "table";

        data.forEach(univ => {
          const row = document.createElement("tr");
          const nameCell = document.createElement("td");
          const linkCell = document.createElement("td");
          const a = document.createElement("a");

          nameCell.innerText = univ.name;
          a.href = univ.web_pages[0];
          a.innerText = univ.web_pages[0];
          a.target = "_blank";
          linkCell.appendChild(a);

          row.appendChild(nameCell);
          row.appendChild(linkCell);
          tbody.appendChild(row);
        });
      } catch (err) {
        console.log("Error:", err);
        alert("Something went wrong. Please try again.");
      }
    }