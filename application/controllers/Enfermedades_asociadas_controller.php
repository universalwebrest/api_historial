<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . '/libraries/REST_Controller.php';
require_once APPPATH . '/libraries/Format.php';

class Enfermedades_asociadas_controller extends REST_Controller
{
    
    public function __construct() {
        parent::__construct();
        $this->load->model('enfermedades_asociadas_model', 'mymodel');
    }
    
    public function index_get($id = NULL){
        
        if (is_null($id))
        {
            $this->response(array('error' => 'No se proporciono el ID'), 400);
        }
        else{
            $query = $this->mymodel->get($id);
            
            if (!is_null($query))
            {
                $this->response(array('enfermedades_asociadas' => $query), 200);
            }else{
                $this->response(array('error' => 'El id es inexistente'), 400);
            }
        }
    }//Fin metodo index_get
    
    public function index_post($id) {
        
        if (is_null($id)) {
            $this->response(array('error' => 'El ID proporcionado es incorrecto'));
        }
        else{
            
            if ($this->mymodel->save($id)) {
                
                $this->response(array('response' => 'El objeto fue creado exitosamente'), 201);
            }
            else{
                
                $this->response(array('error' => 'Ocurrio un error en el servidor'), 400);
            }
        }        
    }
    
    public function update_post($id) {
        
        if (is_null($id) || is_null($this->post('data'))) {
            
            $this->response(array('error' => 'El ID propocionado u objeto post es incorrecto'), 400);
        }
        else{
            
            $data = $this->post('data');
            
            if ($this->mymodel->update($id, $data)) {
                $this->response(array('response' => 'El objeto fue actualizado exitosamente'), 201);
            }
            else{
                $this->response(array('error' => 'Ocurrio un error en el modelo'), 400);    
            }                
        }
        
    }
        
}









