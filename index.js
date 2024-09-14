document.addEventListener("DOMContentLoaded", function () {
  // Function to setup a dropdown
  const buyButton = document.getElementById("buyButton");
  function setupDropdown(dropdownClass, items, isBaseCurrency = false) {
    const dropdown = document.querySelector(`.${dropdownClass}`);
    const dropdownToggle = dropdown.querySelector(".dropdown-toggle");
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");

    // Function to create a dropdown item
    function createDropdownItem(item) {
      const a = document.createElement("a");
      a.setAttribute("value", item.value);
      a.setAttribute("tabindex", "0");
      a.setAttribute("role", "menuitem");
      a.classList.add("dropdown-item");
      a.href = item.href;
      a.textContent = item.text;
      return a;
    }

    // Add menu items to the dropdown
    items.forEach((item) => {
      const menuItem = createDropdownItem(item);
      dropdownMenu.appendChild(menuItem);
    });

    // Get all dropdown items after they've been added
    const dropdownItems = dropdownMenu.querySelectorAll(".dropdown-item");

    function toggleDropdown() {
      const isExpanded =
        dropdownToggle.getAttribute("aria-expanded") === "true";

      dropdownToggle.setAttribute("aria-expanded", !isExpanded);
      dropdownMenu.classList.toggle("show");
      dropdownMenu.setAttribute("aria-hidden", isExpanded);
    }

    // Toggle dropdown on button click
    dropdownToggle.addEventListener("click", toggleDropdown);

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
      if (!dropdown.contains(event.target)) {
        dropdownToggle.setAttribute("aria-expanded", "false");
        dropdownMenu.classList.remove("show");
        dropdownMenu.setAttribute("aria-hidden", "true");
      }
    });

    // Handle keyboard navigation
    dropdownToggle.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleDropdown();
      }
    });

    dropdownItems.forEach(function (item, index) {
      item.addEventListener("keydown", function (event) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          dropdownItems[(index + 1) % dropdownItems.length].focus();
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          dropdownItems[
            (index - 1 + dropdownItems.length) % dropdownItems.length
          ].focus();
        } else if (event.key === "Escape") {
          dropdownToggle.focus();
          toggleDropdown();
        }
      });
    });

    // Update button text when an item is selected and change the URL
    dropdownItems.forEach(function (item) {
      item.addEventListener("click", function (event) {
        event.preventDefault();
        dropdownToggle.textContent = this.textContent;
        toggleDropdown();

        if (isBaseCurrency) {
          updateBuyButtonText(this.textContent);
      }
      });
    });
  }

  // Define the menu items for each dropdown
  const cryptoItems = [
    { value: "BTC", text: "BTC", href: "/BTC-INR" },
    { value: "ETH", text: "ETH", href: "/ETH-INR" },
    { value: "XRP", text: "XRP", href: "/XRP-INR" },
  ];

  const fiatItems = [{ value: "INR", text: "INR", href: "/BTC-INR" }];

  // Setup both dropdowns
  setupDropdown('crypto-dropdown', cryptoItems, true);
  setupDropdown("fiat-dropdown", fiatItems);

  // Function to update the "Buy BTC" button text
  function updateBuyButtonText(crypto) {
    buyButton.textContent = `Buy ${crypto}`;
  }
});



//update progress bar

// Call the function to fetch data and render the table

let timerValue = 60; // Initial timer value

const updateProgressBar = () => {
    const progressBar = document.querySelector('.CircularProgressbar-path');
    const timerText = document.querySelector('.CircularProgressbar-text');
    
    // Calculate the dash offset based on the timer value
    const dashOffset = (60 - timerValue) / 60 * 289.027;
    
    progressBar.style.strokeDashoffset = dashOffset;
    timerText.textContent = timerValue;

    // Decrease the timer value
    if (timerValue > 0) {
        timerValue--;
        setTimeout(updateProgressBar, 1000); // Update every second
    } else {
        timerValue = 60; // Reset the timer value
        setTimeout(updateProgressBar, 1000); // Restart the progress bar
    }
};

// Initial call to start the progress bar
updateProgressBar();
