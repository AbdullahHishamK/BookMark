var name = document.getElementById('bookmarkName');
var url = document.getElementById('bookmarkURL');
var table = document.getElementById('tableContent');
var namevalid = document.getElementById('namevalid');
var urlvalid = document.getElementById("urlvalid");
var productCont = JSON.parse(localStorage.getItem('alldata')) || [];
console.log(productCont);
show();

function createproduct() {
    var product = {
        pname: bookmarkName.value,
        purl: bookmarkURL.value,
    }
    if (validname() && validurl()) {
        productCont.push(product);
        var strarr = JSON.stringify(productCont);
        console.log(strarr);
        localStorage.setItem('alldata', JSON.stringify(productCont));
        console.log(productCont);
        show();
    }
}

function show() {
    var str = '';

    for (var i = 0; i < productCont.length; i++) {
        str += `<tr>
            <td>${i + 1}</td>
            <td>${productCont[i].pname}</td>
            <td><a href="${productCont[i].purl}" target="_blank" class="btn btn-visit">
              <i class="fa-solid fa-eye pe-2"></i>Visit
            </a></td>
            <td><button onclick="del(${i});" class="btn btn-delete pe-2" data-index="0">
              <i class="fa-solid fa-trash-can"></i>
              Delete
            </button></td>
          </tr>`;
    }
    table.innerHTML = str;
}

function del(index) {
    productCont.splice(index, 1);
    show();
    localStorage.setItem('alldata', JSON.stringify(productCont));
    console.log(productCont);
}

function validname() {
    if (/^[A-Z]\w{5,15}$/.test(bookmarkName.value)) {
        bookmarkName.classList.add('is-valid');
        bookmarkName.classList.remove('is-invalid');
        namevalid.classList.add('d-none');
        return true;
    } else {
        bookmarkName.classList.add('is-invalid');
        bookmarkName.classList.remove('is-valid');
        namevalid.classList.remove('d-none');
        namevalid.textContent = 'Site name must start with an uppercase letter and be 6-16 characters long.';
        return false;
    }
}
bookmarkName.addEventListener('blur', validname);

function validurl() {
    if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(bookmarkURL.value)) {
        bookmarkURL.classList.add('is-valid');
        bookmarkURL.classList.remove('is-invalid');
        urlvalid.classList.add('d-none');
        return true;
    } else {
        bookmarkURL.classList.add('is-invalid');
        bookmarkURL.classList.remove('is-valid');
        urlvalid.classList.remove('d-none');
        urlvalid.textContent = 'Site URL must be a valid web address starting with http, https, or ftp.';
        return false;
    }
}
bookmarkURL.addEventListener('blur', validurl);