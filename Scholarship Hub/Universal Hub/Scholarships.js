  const scholarships = [
        {
          id: 1,
          provider: "Google",
          name: "Generation Scholarship",
          amount: "$10,000",
          tags: ["STEM", "Undergrad", "Any Country"],
          deadline: "May 15, 2025",
          cat: "stem",
        },
        {
          id: 2,
          provider: "Microsoft",
          name: "STEM Excellence Award",
          amount: "$5,000",
          tags: ["STEM", "Graduate", "USA"],
          deadline: "Jun 30, 2025",
          cat: "stem",
        },
        {
          id: 3,
          provider: "UN Women",
          name: "Women in Tech Grant",
          amount: "$8,000",
          tags: ["STEM", "Women", "Global"],
          deadline: "Jul 10, 2025",
          cat: "stem",
        },
        {
          id: 4,
          provider: "Adobe Foundation",
          name: "Creative Arts Scholarship",
          amount: "$6,000",
          tags: ["Arts", "Undergrad", "USA"],
          deadline: "Aug 1, 2025",
          cat: "arts",
        },
        {
          id: 5,
          provider: "Fulbright",
          name: "Global Arts Exchange",
          amount: "$12,000",
          tags: ["Arts", "Graduate", "Any Country"],
          deadline: "Sep 15, 2025",
          cat: "arts",
        },
        {
          id: 6,
          provider: "Harvard Business",
          name: "Future Leaders Grant",
          amount: "$15,000",
          tags: ["Business", "MBA", "USA"],
          deadline: "Oct 1, 2025",
          cat: "business",
        },
        {
          id: 7,
          provider: "World Bank",
          name: "Development Economics Award",
          amount: "$20,000",
          tags: ["Business", "Research", "Global"],
          deadline: "Nov 1, 2025",
          cat: "business",
        },
        {
          id: 8,
          provider: "Gates Foundation",
          name: "Gates Millennium Scholars",
          amount: "Full Ride",
          tags: ["Need-Based", "Any Field", "USA"],
          deadline: "Jan 15, 2026",
          cat: "need",
        },
        {
          id: 9,
          provider: "Ford Foundation",
          name: "Diversity in Education",
          amount: "$25,000",
          tags: ["Need-Based", "Any Field", "Global"],
          deadline: "Feb 1, 2026",
          cat: "need",
        },
      ];
      const saved = new Set();
      let schFilter = "all";

      function renderSch() {
        const q = (
          document.getElementById("sch-search").value || ""
        ).toLowerCase();
        const g = document.getElementById("sch-grid");
        const list = scholarships.filter(
          (s) =>
            (schFilter === "all" || s.cat === schFilter) &&
            (!q ||
              s.name.toLowerCase().includes(q) ||
              s.provider.toLowerCase().includes(q)),
        );
        if (!list.length) {
          g.innerHTML =
            '<div class="no-sch">😔 No scholarships match your search.</div>';
          return;
        }
        g.innerHTML = list
          .map(
            (s, i) => `
    <div class="sch-card" style="animation-delay:${i * 0.06}s">
      <button class="save-btn" onclick="toggleSave(${s.id},this)">${saved.has(s.id) ? "❤️" : "🤍"}</button>
      <div class="sch-provider">${s.provider}</div>
      <div class="sch-name">${s.name}</div>
      <div class="sch-amount">${s.amount}</div>
      <div class="sch-tags">${s.tags.map((t) => '<span class="sch-tag">' + t + "</span>").join("")}</div>
      <div class="sch-deadline">Deadline: <strong>${s.deadline}</strong></div>
      <button class="btn-apply" onclick="toast('Applied to ${s.name.replace(/'/g, "\\'")} ✅','#10b981')">Apply Now</button>
    </div>`,
          )
          .join("");
      }
      function toggleSave(id, btn) {
        if (saved.has(id)) {
          saved.delete(id);
          btn.textContent = "🤍";
          toast("Removed from saved", "#64748b");
        } else {
          saved.add(id);
          btn.textContent = "❤️";
          toast("Saved ❤️", "#ef4444");
        }
      }
      function setSF(el, val) {
        document
          .querySelectorAll(".sch-filter")
          .forEach((b) => b.classList.remove("active"));
        el.classList.add("active");
        schFilter = val;
        renderSch();
      }
      // expose to window for inline onclick
      window.renderSch = renderSch;
      window.toggleSave = toggleSave;
      window.setSF = setSF;

      renderSch();