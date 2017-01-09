<?php
/*
 * This file has been generated automatically.
 * Please change the configuration for correct use deploy.
 */

require 'recipe/common.php';
$config = array(
    'product_name'=>'issacer.github.io',
    'wwwroot'=>'/data/wwwroot/default/'
);

// Set configurations
set('repository', 'git@github.com:issacer/'.$config['product_name'].'.git');
/*set('shared_files', []);
set('shared_dirs', []);
set('writable_dirs', []);*/

// Configure servers
server('prod', '114.215.114.105', 22)
    ->user('root')
    ->identityFile('~/.ssh/id_rsa.pub')
    ->stage('master')
    ->env('branch', 'master')
    ->env('deploy_path', $config['wwwroot'].'/'.$config['product_name']);

/*server('beta', 'beta.domain.com')
    ->user('username')
    ->password()
    ->env('deploy_path', '/var/www/beta.domain.com');*/

/**
 * Restart php-fpm on success deploy.
 */
task('php-fpm:restart', function () {
    // Attention: The user must have rights for restart service
    // Attention: the command "sudo /bin/systemctl restart php-fpm.service" used only on CentOS system
    // /etc/sudoers: username ALL=NOPASSWD:/bin/systemctl restart php-fpm.service
    run('sudo /bin/systemctl restart php-fpm.service');
})->desc('Restart PHP-FPM service');

after('success', 'php-fpm:restart');

/**
 * Main task
 */
task('deploy', [
    'deploy:prepare',
    'deploy:release',
    'deploy:update_code',
    /*'deploy:shared',
    'deploy:writable',*/
    'deploy:symlink',
    'cleanup',
])->desc('Deploy your project');

after('deploy', 'success');