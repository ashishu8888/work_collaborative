import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:work_collaborative/models/error_modal.dart';
import 'package:work_collaborative/repository/auth_repository.dart';
import 'package:work_collaborative/screens/home_screen.dart';
import 'package:work_collaborative/screens/login_screen.dart';

void main() {
  runApp(
    const ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends ConsumerStatefulWidget {
  const MyApp({super.key});

  @override
  ConsumerState<MyApp> createState() => _MyAppState();
}

class _MyAppState extends ConsumerState<MyApp> {
  // This widget is the root of your application.
  ErroModel? erroModel;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getUserData();
  }

  void getUserData() async {
    erroModel = await ref.read(AuthRepositoryProvider).getUserData();

    if (erroModel != null && erroModel!.data != null) {
      ref.read(userProvider.notifier).update((state) => erroModel!.data);
    }
  }

  @override
  Widget build(BuildContext context) {
    final user = ref.watch(userProvider);
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      debugShowCheckedModeBanner: false,
      home: user == null ? const LoginScreen() : const HomeScreen(),
    );
  }
}
