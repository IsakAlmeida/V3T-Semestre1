//Declaração de variaveis
#include "DHT.h"

#define TIPO_SENSOR DHT11
const int PINO_SENSOR_DHT11 = A0;

DHT sensorDHT(PINO_SENSOR_DHT11, TIPO_SENSOR);
//Configurações
void setup() {
  Serial.begin(9600);
  sensorDHT.begin();
}

//Execução
void loop() {
  float umidade = sensorDHT.readHumidity();
  float temperatura = sensorDHT.readTemperature();

  if (isnan(temperatura) || isnan(umidade)) {
    Serial.println("Erro ao ler os dados do sensor");
  } else {
    Serial.print(temperatura);
    Serial.print(";");
    Serial.println(umidade);
  }
    delay(2000);
}
