def handle_possui(file):
    new_file = ""
    open_file = open(file, 'r')
    for line in open_file:
        splitted = line.split(';')
        new_file += "Extrema Pobreza; " + splitted[0] + '; ' + splitted[1] + '\n' 
        new_file += "Pobreza; " + splitted[0] + '; ' + splitted[2] + "\n"
        new_file += "Baixa Renda; " + splitted[0] + '; ' + splitted[3] + "\n"
        new_file += "Mais de 1/2 salário mínimo; " + splitted[0] + '; ' + splitted[4] + "\n"
    to_write = open("./src/data/Possui.csv", 'w+')
    to_write.write(new_file)
    to_write.close()

def handle_crimes(file):
    old_file = open(file, "r")
    new_csv = ""
    for line in old_file:
        splitted = line.split(';')
        new_csv += "Homicídio Doloso" + "; " + splitted[1] + "; " + splitted[0] + "; " + splitted[2] + "\n"
        new_csv += "Latrocínio" + "; " + splitted[1] + "; " + splitted[0] + "; " + splitted[3] + "\n"
        new_csv += "Homicídio por intervenção policial" + "; " + splitted[1] + "; " + splitted[0] + "; " + splitted[4] + "\n"
        new_csv += "Letalidade Violenta"  + "; " + splitted[1] + "; " + splitted[0] + "; " + splitted[5] + "\n"
        new_csv += "Estupro" + "; " + splitted[1] + "; " + splitted[0] + "; " + splitted[6] + "\n"
        new_csv += "Roubos" + "; " + splitted[1] + "; " + splitted[0] + "; " + splitted[7] + "\n"
        new_csv += "Furtos"  + "; " + splitted[1] + "; " + splitted[0] + "; " + splitted[8] + "\n"
        new_csv += "Sequestro" + "; " + splitted[1] + "; " + splitted[0] + "; " + splitted[9] + "\n"
        new_csv += "Estelionario" + "; " + splitted[1] + "; " + splitted[0] + "; " + splitted[10] + "\n"
        new_csv += "Apreensão de Drogas"  + "; " + splitted[1] + "; " + splitted[0] + "; " + splitted[11] + "\n"
        new_csv += "Tráfico de Drogas" + "; " + splitted[1] + "; " + splitted[0] + "; " + splitted[12] + "\n"
        new_csv += "Registro de Ocorrências" + "; " + splitted[1] + "; " + splitted[0] + "; " + splitted[13] + "\n"
        
    new_file = open("./Crimes.csv", 'w+')
    new_file.write(new_csv)
    new_file.close()

        
# handle_possui("./src/data/Possui.csv")
handle_crimes("./src/data/csv.csv")