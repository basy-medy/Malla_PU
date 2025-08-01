import React from "react";

export const Welcome = () => {
    return (
        <div className="flex mt-40 sm:mt-20  my-4 items-center mx-auto justify-center flex-col">
            <div className="flex items-center">
                <div className="w-auto text-justify mr-10 ml-10 mb-5">
                    <span className="text-blue-600 font-bold">Malla Planificación Urbana UC</span> se trata de una herramienta creada en
                    <span className="italic"> base</span> a projectos de malla para los estudiantes de las carreras de <a href="https://malla-interactiva-fono.netlify.app/" target="_blank" rel="noopener noreferrer">
                    <span className="font-bold">Licenciatura</span></a> en
                    <span className="font-semibold"> Astronomía</span> y <span className="font-semibold">Física </span>, así como para la carrera de 
                    <a href="https://puc.jjsm.uk/Astro-UC-Malla/" target="_blank" rel="noopener noreferrer">
                    <span className="font-bold"> Fonoaudiología</span></a> de la UC (Pontificia Universidad Católica de Chile). La herramienta permite visualizar de manera más
                    clara y sencilla los ramos de cada carrera y sus respectivos currículums.
                    <br/>
                    <br/>
                    En la parte superior podrás cambiar la malla seleccionada a visualizar y en la parte inferior
                    encontrarás el significado de todos los detalles de la malla.
                    <br/>
                    <br/>
                    <span className="text-gray-500">*Es importante aclarar que esta malla no debe ser tomada como la oficial
                    y que puede haber errores en la información presentada. La construcción de esta malla no tiene ninguna asociación
                        oficial con la UC, fue realizada por un estudiante.
                    </span>
                </div>
            </div>
            <hr className="w-full my-4 border-gray-300"/>
        </div>
    );
};