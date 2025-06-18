import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';


const Stack = createNativeStackNavigator();

const productos = [
  {
    id: '1',
    nombre: 'Sudadera Puma Hombre Scuderia Ferrari Team Hoodie Rojo',
    precio: 2599,
    imagen: 'https://store.ferrari.com/dw/image/v2/BGDG_PRD/on/demandware.static/-/Sites-48/default/dwe3b1f1f9/images/zoom/LA01Wf_98_10.jpg?strip=false',
    reseñas: [5, 4, 4, 5],
  },
  {
    id: '2',
    nombre: 'Sudadera H Mercedes Amg 2024',
    precio: 1780,
    imagen: 'https://racewear.com.mx/cdn/shop/files/Hoodie_Mercedes_AMG_F1_2024.webp?v=1727721871',
    reseñas: [3, 4, 5],
  },
  {
    id: '3',
    nombre: 'Red Bull Racing F1 para Hombre 2023',
    precio: 3000,
    imagen: 'https://m.media-amazon.com/images/I/416U9SQ0YbL._AC_.jpg',
    reseñas: [5, 5, 5, 4],
  },
  {
    id: '4',
    nombre: 'Gorra Puma Team Scuderia Ferrari Carlos Sainz Original 2023',
    precio: 1200,
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_720071-MLM85891876893_062025-O-gorra-puma-team-scuderia-ferrari-carlos-sainz-original-2023.webp',
    reseñas: [4, 4, 3],
  },
   {
    id: '5',
    nombre: 'RBR All Season Cap 2024',
    precio: 780,
    imagen: 'https://checoperez.com/cdn/shop/files/New-Era-9Forty-Perez-Cap.webp?v=1708357123&width=1445',
    reseñas: [4, 4, 3],
  },
   {
    id: '6',
    nombre: 'Team Tee Red Bull Racing F1 2023 - S',
    precio: 1200,
    imagen: 'https://checoperez.com/cdn/shop/files/RBR23007_1H_1.webp?v=1682359070&width=1946',
    reseñas: [4, 4, 3],
  },
   {
    id: '7',
    nombre: 'Gorra Monaco Checo Perez 2024',
    precio: 1400,
    imagen: 'https://racewear.com.mx/cdn/shop/files/Gorra-Checo-Perez-Monaco-2024.png?v=1715055209',
    reseñas: [4, 4, 3],
  },
  {
    id: '8',
    nombre: 'SP Mini Helmet All Season 2021 Scale 1:2',
    precio: 4500,
    imagen: 'https://checoperez.com/cdn/shop/products/SP-006_11_1.png?v=1664300861&width=600',
    reseñas: [4, 4, 3],
  },
  {
    id: '9',
    nombre: 'SP Mini Helmet All Season 2022 Scale 1:4',
    precio: 2500,
    imagen: 'https://checoperez.com/cdn/shop/products/SERP-001_1.png?v=1664315287&width=600',
    reseñas: [4, 4, 3],
  },
  {
    id: '10',
    nombre: 'Aston Martin Aramco Cognizant F1 2025 Fernando Alonso Team Driver Camiseta',
    precio: 1249,
    imagen: 'https://images.footballfanatics.com/aston-martin/aston-martin-aramco-cognizant-f1-2025-fernando-alonso-team-driver-t-shirt_ss5_p-202359058+u-779c5zoylax1dggz1xqe+v-ffawv6oa9kmrgm558z2m.jpg?_hv=2&w=600',
    reseñas: [4, 4, 3],
  },
  {
    id: '11',
    nombre: 'Fernando Alonso Renault F1 2005',
    precio: 12.49,
    imagen: 'https://veloce.es/cdn/shop/files/Carrusel_2_97.png?v=1734668286&width=1946',
    reseñas: [4, 4, 3],
  },
  {
    id: '12',
    nombre: 'RB, indumentaria del equipo RB F1 2024,',
    precio: 2000,
    imagen: 'https://images.footballfanatics.com/vcarb/vcarb-hugo-2025-team-t-shirt-white_ss5_p-202284789+u-tebpr32yhcgmfggepx6p+v-yvsmkrunopn1fjlyyagm.jpg?_hv=2&w=600',
    reseñas: [4, 4, 3],
  },
  {
    id: '13',
    nombre: 'Gorra Pierre Gasly Alpine F1™ 2025 Silverstone GP – Edición Especial',
    precio: 1500,
    imagen: 'https://pitshop.mx/cdn/shop/files/ProductosPitshop_87.jpg?v=1746036954',
    reseñas: [4, 4, 3],
  },
  {
    id: '14',
    nombre: 'Chaqueta resistente al agua Alpine F1™ Team 2025',
    precio: 4300,
    imagen: 'https://pitshop.mx/cdn/shop/files/ProductosPitshop_6.png?v=1742934911&width=493',
    reseñas: [4, 4, 3],
  },
  {
    id: '15',
    nombre: 'Playera Polo Alpine F1™ Team 2025 – Oficial de Pilotos',
    precio: 2400,
    imagen: 'https://pitshop.mx/cdn/shop/files/ProductosPitshop_14.png?v=1742936907&width=493',
    reseñas: [4, 4, 3],
  },
];

function HomeScreen({ navigation }) {
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [menuAbierto, setMenuAbierto] = useState(false);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    Alert.alert('✅ Producto agregado', `${producto.nombre} ha sido agregado al carrito.`);
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const promedioEstrellas = (reseñas) => {
    const total = reseñas.reduce((sum, r) => sum + r, 0);
    return Math.round(total / reseñas.length);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#f9f9f9' }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuAbierto(!menuAbierto)}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Merch F1</Text>
      </View>

      {/* Menú lateral */}
      {menuAbierto && (
        <View style={styles.menuLateral}>
          <View style={{ marginTop: 100 }}>
            <TouchableOpacity onPress={() => setMenuAbierto(false)}>
              <Text style={styles.menuItem}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setMenuAbierto(false);
              navigation.navigate('Carrito', { carrito, setCarrito });
            }}>
              <Text style={styles.menuItem}>🛒 Ir al carrito</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuAbierto(false)}>
              <Text style={styles.menuCerrar}>✖️ Cerrar menú</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView style={{ marginBottom: 60 }}>
        {/* Buscador */}
        <TextInput
          style={styles.input}
          placeholder="🔍 Buscar productos..."
          value={busqueda}
          onChangeText={setBusqueda}
        />

        {/* Productos destacados */}
        <Text style={styles.subtitulo}>🔥 Productos destacados</Text>
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Detalle', { producto: item, agregarAlCarrito })}
              style={styles.destacadoCard}
            >
              <Image source={{ uri: item.imagen }} style={styles.imagenDestacada} />
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text>💲 {item.precio.toFixed(2)}</Text>
              <View style={styles.estrellas}>
                {Array(promedioEstrellas(item.reseñas))
                  .fill()
                  .map((_, i) => (
                    <Text key={i}>⭐</Text>
                  ))}
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Todos los productos */}
        <Text style={styles.subtitulo}>Todos los productos</Text>
        <FlatList
          data={productosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Detalle', { producto: item, agregarAlCarrito })}
              style={styles.card}
            >
              <Image source={{ uri: item.imagen }} style={styles.imagen} />
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text>💲 {item.precio.toFixed(2)}</Text>
              <View style={styles.estrellas}>
                {Array(promedioEstrellas(item.reseñas))
                  .fill()
                  .map((_, i) => (
                    <Text key={i}>⭐</Text>
                  ))}
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      {/* Botón flotante carrito */}
      <View style={styles.botonFijo}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Carrito', { carrito, setCarrito })}
          style={styles.botonIrCarrito}
        >
          <Text style={styles.textoBoton}>🛒 Ver carrito ({carrito.length})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CarritoScreen({ route, navigation }) {
  const { carrito, setCarrito } = route.params;

  const total = carrito.reduce((sum, item) => sum + item.precio, 0);

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
    Alert.alert('🗑️ Producto eliminado');
  };

  return (
    <View style={[styles.container, { backgroundColor: '#f9f9f9' }]}>
      <Text style={styles.subtitulo}>🛒 Carrito</Text>
      <ScrollView style={{ marginBottom: 60 }}>
        {carrito.length === 0 ? (
          <Text style={{ textAlign: 'center' }}>El carrito está vacío.</Text>
        ) : (
          carrito.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: item.imagen }} style={styles.imagen} />
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text>💲 {item.precio.toFixed(2)}</Text>
              <TouchableOpacity
                onPress={() => eliminarDelCarrito(index)}
                style={[styles.botonAgregar, { backgroundColor: 'red' }]}
              >
                <Text style={{ color: '#fff' }}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
        <View style={styles.carrito}>
          <Text>🧾 Artículos: {carrito.length}</Text>
          <Text>💰 Total: ${total.toFixed(2)}</Text>
        </View>
      </ScrollView>

      {/* Botón flotante Comprar */}
      <View style={styles.botonFijo}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Pago', { total })}
          style={[styles.botonIrCarrito, { backgroundColor: '#28a745' }]}
        >
          <Text style={styles.textoBoton}>💳 Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function PagoScreen({ route }) {
  const { total } = route.params;

  const confirmarPago = (metodo) => {
    Alert.alert('✅ Pago confirmado', `Has pagado $${total.toFixed(2)} con ${metodo}. ¡Gracias por tu compra!`);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#f9f9f9' }]}>
      <Text style={styles.subtitulo}>💳 Opciones de pago</Text>
      <TouchableOpacity onPress={() => confirmarPago('Tarjeta de crédito')} style={styles.botonAgregar}>
        <Text style={{ color: '#fff' }}>Tarjeta de crédito</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => confirmarPago('PayPal')} style={styles.botonAgregar}>
        <Text style={{ color: '#fff' }}>PayPal</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => confirmarPago('Transferencia bancaria')} style={styles.botonAgregar}>
        <Text style={{ color: '#fff' }}>Transferencia bancaria</Text>
      </TouchableOpacity>
    </View>
  );
}

function DetalleProductoScreen({ route }) {
  const { producto, agregarAlCarrito } = route.params;

  const promedioEstrellas = (reseñas) => {
    const total = reseñas.reduce((sum, r) => sum + r, 0);
    return Math.round(total / reseñas.length);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f9f9f9' }]}>
      <Text style={styles.subtitulo}>{producto.nombre}</Text>
      <Image source={{ uri: producto.imagen }} style={styles.imagen} />
      <Text style={{ fontSize: 18, marginBottom: 10 }}>💲 {producto.precio.toFixed(2)}</Text>
      <Text style={{ marginBottom: 10 }}>Descripción: Este es un excelente producto de calidad premium que no te puedes perder.</Text>
      <Text style={styles.subtitulo}>⭐ Reseñas</Text>
      <View style={styles.estrellas}>
        {Array(promedioEstrellas(producto.reseñas))
          .fill()
          .map((_, i) => (
            <Text key={i}>⭐</Text>
          ))}
      </View>
      <View style={{ marginBottom: 20 }}>
        {producto.reseñas.map((r, index) => (
          <Text key={index}>⭐ {r} estrellas - ¡Muy buen producto!</Text>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => agregarAlCarrito(producto)}
        style={[styles.botonAgregar, { backgroundColor: '#28a745' }]}
      >
        <Text style={{ color: '#fff' }}>🛒 Agregar al carrito</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Carrito" component={CarritoScreen} />
        <Stack.Screen name="Pago" component={PagoScreen} />
        <Stack.Screen name="Detalle" component={DetalleProductoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
header: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  paddingTop: StatusBar.currentHeight || 40, 
  height: 60 + (StatusBar.currentHeight || 40),
  backgroundColor: '#ff0000',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 10,
  elevation: 5,
  zIndex: 1000,
},
menuIcon: {
  fontSize: 28,
  position: '',
  left: -100,
},
titulo: {
  fontSize: 24,
  fontWeight: 'bold',
},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  card: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ff0000',
    borderRadius: 5,
    elevation: 2,
  },
  imagen: {
    width: '100%',
    height: 200,
    marginBottom: 5,
  },
  imagenDestacada: {
    width: 120,
    height: 120,
    marginBottom: 5,
  },
  nombre: {
    fontWeight: 'bold',
  },
  botonAgregar: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  carrito: {
    padding: 10,
    backgroundColor: '#eee',
    marginTop: 10,
  },
  botonFijo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  botonIrCarrito: {
    backgroundColor: '#ff0000',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  destacadoCard: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#ff0000',
    borderRadius: 5,
    elevation: 2,
    width: 140,
  },
  menuLateral: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: '100%',
    backgroundColor: '#fff',
    padding: 10,
    zIndex: 999,
    elevation: 5,
  },
  menuItem: {
    fontSize: 18,
    marginBottom: 10,
  },
  menuCerrar: {
    fontSize: 16,
    color: 'red',
  },
  estrellas: {
    flexDirection: 'row',
    marginVertical: 5,
  },
});
