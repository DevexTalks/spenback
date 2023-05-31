import json
import pandas as pd
import numpy as np

def buscar_archivos(patron):
    import glob
    import os
    
    ruta_actual = os.getcwd()  # Obtener la ruta actual
    carpeta_padre = os.path.dirname(ruta_actual) 
    
    patron = f'*{patron}*'

    archivos_encontrados = glob.glob(f'{carpeta_padre}/**/{patron}', recursive=True)
    return archivos_encontrados


def crear_dataframe_aleatorio(filas, columnas):
    datos_aleatorios = np.random.rand(filas, columnas)
    df = pd.DataFrame(datos_aleatorios)
    return df


if __name__ == '__main__':
    #ID = sys.argv[1]
    """ ID = "admin.neps"
    resultado = buscar_archivos(ID)
    resultado_json = json.dumps(resultado)
    print(resultado_json) """
    
    # Ejemplo de uso
    num_filas = 10
    num_columnas = 5
    df_aleatorio = crear_dataframe_aleatorio(num_filas, num_columnas)
    resultado_json = df_aleatorio.to_json(orient='records')
    print(resultado_json)