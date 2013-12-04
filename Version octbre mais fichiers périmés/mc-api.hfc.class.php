<?php

/**
 * @Class apimcHFC
 * La classe apimcHFC définit les extension get_header() et get_footer() de twig
 * Elle récupère les informations json depuis api-mc (plus de détail sur STI de C.Bazureau). 
 * Il est possible de rajouter des paramètres au fur et à mesure des évolutions
 * en les créant en attribut, ils seront directement exploitables dans
 * les méthodes de la classe.
 *
 * /!\ Attention aux permissions sur le répertoire de cache /!\
 * ------------------------------------------------------------
 * 
 * Exemple d'appel :
 * $hfjson = new apimcHFC(
 *            array(
 *                'cache_path' => '../app/cache',
 *                'remove_search' => false,
 *                'search_site' => 'services',
 *            )
 *        );
 *
 * echo $hfjson->get_header();
 *
 * --------------------------------------------------
 * @author Guilhem Marty (gumarty@bouyguestelecom.fr)
 * @version 1.0
 * 
 * Changelog :
 * 11/03/2013 - première version
 * 
 */
 
class apimcHFC
{
    
    private $header;
    private $footer;
    
    private $tgtDomain = 'http://api-mc.bouyguestelecom.fr';
    private $tgtRsrc = '/static/header/headerfooter.html.json';
    
    private $cache = true;
    private $cache_period = 5;
    private $cache_path = 'cache';
    private $cache_filename = 'hfc.json';
    
    private $remove_search = false;
    private $search_site = '';
    
    
    /**
     * Constructeur
     * @param array $settings permet d'influer sur les paramètres par défaut.
     */
    public function __construct( $setting = array() )
    {
       
        foreach($setting as $key => $value){
            if( isset($this->$key) )
                $this->$key = $value;
        }
        
        if( $this->cache ){
        
            if(!file_exists($this->cache_path)){
                mkdir($this->cache_path);
            }
            
            $json_cache = $this->cache_path.'/'.$this->cache_filename;
        }
        
        if($this->cache && file_exists($json_cache)){
        
            $cache_date = date('Y-m-d H:i:s', filemtime($json_cache));
            $cache_age = round((time() - strtotime($cache_date))/60);
            $cache_overdue = (($this->cache_period - $cache_age <= 0 )? true : false );
            
            if($cache_overdue){
            
                $json = $this->get_json();
                file_put_contents($json_cache,$json);
            
            }else{
            
                $json = file_get_contents($json_cache);
            
            }
            
        }else{
        
            $json = $this->get_json();
            
            if( $this->cache )
                file_put_contents($json_cache,$json);
        }
        
        $json = json_decode($json);
        
        $this->header = $json->header;
        $this->footer = $json->footer;
        
        $this->apply_filters();
        
    }
    
    /**
     * Appel le json distant sur api-mc
     * @return données json brutes
     */
    public function get_json()
    {
        $curl = curl_init($this->tgtDomain.$this->tgtRsrc);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $json = curl_exec($curl);
        curl_close($curl);
        
        return $json;
    }
    
    /**
     * Applique les filtres sur le html du header et footer
     * @return void
     */
    public function apply_filters()
    {

        if($this->remove_search){
            
            // masque le champ de recherche
            $this->header = str_replace('<span class="search">', '<span class="search" style="display:none;">',$this->header);
        
        }
        
        if(!empty($this->search_site)){
        
            // ajouter un input hidden précisant l'onglet d'atterrissage sur le moteur de recherche
            $this->header = str_replace('<input type="submit" class="search-btn" value="" style="left:145px;" />', '<input type="hidden" name="site" value="'.$this->search_site.'" /><input type="submit" class="search-btn" value="" style="left:145px;" />',$this->header);
        
        }
        
    }
    
    /**
     * Fournit les données HTML header
     * @return string données html
     */
    public function get_header()
    {
        return $this->header;
    }
    
    /**
     * Fournit les données HTML footer
     * @return string données html
     */
    public function get_footer()
    {
        return $this->footer;
    }
}