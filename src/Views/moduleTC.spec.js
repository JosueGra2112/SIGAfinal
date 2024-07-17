import { Selector } from 'testcafe';

fixture`Carga de archivo e inserción en la base de datos`.page`http://localhost:3000/CargaAlumnos`;

test('Cargar archivo Excel y verificar inserción en la base de datos', async t => {
    // Seleccion del input y carga de archivo (ruta en el que se localiza)
    await t.setFilesToUpload('input[type=file]', ['C:\\Users\\Jaime\\Desktop\\SABANAS_ALUMNOS2.xlsx']);

    //Envio de form
    await t.click('button[type=submit]');

    //Espera y envio de mensaje exitoso
    await t.expect(Selector('.mensaje').innerText).contains('Registros nuevos insertados correctamente.');
    await t.wait(5000); // 5 seg de espera (milis)

    // Consulta de bd? agregar submodulo
});
