    const requestForm = document.querySelector('.request__form');

    const collectData = function(formEl) {
        // const data = Array.from(formEl.elements)
        //     .filter((item) => !!item.name)  // фильтруем эл-ты с пустым именем (кнопка)
        //     .map((el) => {
        //         const {name, value} = el;
        //         return { name, value };
        //     });
        // console.log(data);

        const data = new FormData();
        Array.from(formEl.elements)
            .filter((item) => !!item.name)
            .forEach((el) => {
                const {name, value} = el;
                data.append(name, value);
            });

        return data;
    }

    const sendData = async function(data) {
        return await fetch('/api/apply/', {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: data,
        })
    }

    function toggleLoader() {
        const loader = document.getElementById('loader');
        loader.classList.toggle('none');
    }

    function onSuccess(formEl) {
        alert('Thanks for your request!');
        formEl.reset();
    }

    function onError(status, error) {
        if (error && error.message) {
            alert(error.message);
        } else {
            alert('The error occurred: ' + status);
        }
    }

    const handleSubmit = async function(event) {
        event.preventDefault();
        const data = collectData(event.target); // event.target = requestForm
        // console.log(Array.from(data.entries()));
        toggleLoader();
        // const { response } = await sendData(data);
        // console.log(response);
        const { status, error } = await sendData(data);
        // console.log(status, error);
        toggleLoader();

        if (status === 200) {
            onSuccess(event.target);
        } else {
            onError(status, error);
        }
    };

    // submitBtn.addEventListener('click', handleSubmit);
    requestForm.addEventListener('submit', handleSubmit);

    const disableBtn = function(event) {
        const formEl = event.target.form;
        const isValid = formEl.checkValidity();
        formEl.querySelector('.btn--form').disabled = !isValid;

        // const submitBtn = formEl.querySelector('.btn--form');
        // if (!isValid){
        //     submitBtn.setAttribute('disabled', true);
        // } else {
        //     submitBtn.removeAttribute('disabled');
        // }
    };

    requestForm.addEventListener('input', disableBtn);
