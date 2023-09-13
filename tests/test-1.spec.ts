import { test, expect } from '@playwright/test';

await page.goto('http://localhost:5173/');
await page.getByRole('heading', { name: 'Elija la forma de cargar su datos:' }).click();
await page.getByRole('button', { name: 'Cargar los datos manualmente' }).click();
await page.getByRole('heading', { name: 'Ingrese los datos del alumno que realizara la cursada:' }).click();
await page.getByPlaceholder('Ernesto Pedro').click();
await page.getByRole('button', { name: 'Anterior' }).click();
await page.getByRole('button', { name: 'Frente de documento Cargar datos con una imagen del DNI argentino' }).click();
await page.getByText('Seleccione el archivo').click();
await page.locator('body').setInputFiles('código pdf417.jpeg');
await page.getByText('Seleccione el archivo').click();
await page.locator('body').setInputFiles('WhatsApp Image 2023-08-01 at 20.23.22.jpeg');
await page.getByRole('heading', { name: 'Ingrese su mail:' }).click();
});